import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject, catchError, from, map, of, tap } from 'rxjs';

import { jwtDecode } from "jwt-decode";

import { 
  AuthenticationResultType,
  CognitoIdentityProviderClient, 
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
  SignUpCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";

const COG_CLIENTID = 'asdfas33234vbf';

const ACCESSTOKEN_KEY = 'Cog-AccessToken';
const IDTOKEN_KEY = 'Cog-IdToken';
const EXP_KEY = 'Cog-Expiration';
const REFRESH_KEY = 'Cog-Refresh';

const NO_AUTH: IAuthResult = { offline: false };

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private client: CognitoIdentityProviderClient;
 
  /**
   * resolves authentication token
   */
  onAuth: Subject<IAuthResult> = new Subject();

  token?: string; // cache access token for AWS requests
  user?: AppUser; // cache user object for other components

  private platformId = inject(PLATFORM_ID);

  constructor () {
    this.client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
  }

  isSignedIn (): Observable<IAuthResult> {
    if (!isPlatformBrowser(this.platformId))
      return of(NO_AUTH);

    // refresh access token
    let refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
      return of(NO_AUTH);
    }

    // try to refresh credentials with stored refresh token
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: COG_CLIENTID,
      AuthParameters: {
        'REFRESH_TOKEN': refreshToken
      }
    });

    return from(this.client.send(command))
      .pipe(
        tap(res => {
          if (res.AuthenticationResult)
            this.storeSignInData(res.AuthenticationResult, true);
        }),
        catchError(err => {
          console.warn(err);
          // network error, pass on stored tokens if any
          if (err.message === 'Failed to fetch') {
            let idToken = localStorage.getItem(IDTOKEN_KEY);
            let accessToken = localStorage.getItem(ACCESSTOKEN_KEY);
            if (idToken && accessToken)
              return of({ AuthenticationResult: { IdToken: idToken, AccessToken: accessToken, offline: true } });
          }
          return of(false);
        }),
        map(res => {
          if (!res) // false from catch error
            return NO_AUTH;

          let ar: AuthenticationResultType = (<any>res).AuthenticationResult;
          if (!ar.IdToken)
            return NO_AUTH;

          this.user = this.getUser(ar.IdToken, ar.AccessToken);
          return {
                  user: this.user,
                  offline: (<any>res).offline || false
                };
        })
      );
  }

  signUp ( auth: IAuthDetails ): Observable<SignUpCommandOutput|null> {
    const command = new SignUpCommand({
      ClientId: COG_CLIENTID,
      Username: auth.Username,
      Password: auth.Password,
      UserAttributes: [
        {
          Name: "name", 
          Value: auth.Name
        },
        {
          Name: 'email',
          Value: auth.Username
        }
      ],
    });
    return from(this.client.send(command));
  }

  confirmSignUp ( Username: string, ConfirmationCode: any ): Observable<any> {
    const command = new ConfirmSignUpCommand({
      ClientId: COG_CLIENTID, 
      Username,
      ConfirmationCode: ConfirmationCode.toString(10)
    });
    return from(this.client.send(command));
  }

  signOut () {
    localStorage.removeItem(IDTOKEN_KEY);
    localStorage.removeItem(ACCESSTOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXP_KEY);

    this.onAuth.next(NO_AUTH);
  }

  resetPassword ( Username: string ): Observable<any> {
    const command = new ForgotPasswordCommand({
      ClientId: COG_CLIENTID,
      Username
    }); 
    return from(this.client.send(command));
  }

  confirmPassword ( Username: string, Password: string, ConfirmationCode: any ): Observable<any> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: COG_CLIENTID,
      Username,
      Password,
      ConfirmationCode: ConfirmationCode.toString(10)
    }); 
    return from(this.client.send(command));
  }

  resendConfirmation ( Username: string ): Observable<any> {
    const command = new ResendConfirmationCodeCommand({
      ClientId: COG_CLIENTID,
      Username
    }); 
    return from(this.client.send(command));
  }

  private storeSignInData ( authRes: AuthenticationResultType, refreshed: boolean = false ) {
    if (!refreshed)
      this.storeSignInItem(REFRESH_KEY, authRes.RefreshToken);
    
    this.storeSignInItem(ACCESSTOKEN_KEY, authRes.AccessToken);
    
    this.storeSignInItem(IDTOKEN_KEY, authRes.IdToken);
    this.token = authRes.IdToken;

    if (authRes.ExpiresIn)
      this.storeSignInItem(EXP_KEY, (Date.now() + authRes.ExpiresIn).toString(10));
  }

  private storeSignInItem ( key: string, value?: string ) {
    if (value)
      localStorage.setItem(key, value);
  }

  private getUser ( idToken: string, accessToken?: string ) {
    let payload: any = jwtDecode(idToken);
    let groups = payload['cognito:groups'] || [];

    return <AppUser>{
      name: payload.name,
      email: payload.email,
      sub: payload.sub,
      groups,

      accessToken: accessToken,
      idToken: idToken
    };
  }
}

export interface IAuthDetails {
  Username: string;
  Password: string;
  PasswordCompare: string;
  Name: string;
}
  
export interface IAuthResult {
  user?: any;
  offline: boolean;
}

export interface AppUser {
  name: string;
  email: string;
  sub: string;
  groups: string[];

  accessToken?: string;
  idToken?: string;
}