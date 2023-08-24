import DarkThroneClient, { APIError, APIResponse } from '..';

export type UserSessionObject = {
  id: string;
  email: string;
  playerID?: string;
  hasConfirmedEmail: boolean;
};

export default class AuthController {
  private root: DarkThroneClient;

  constructor(root: DarkThroneClient) {
    this.root = root;
  }

  async getCurrentUser(): Promise<APIResponse<'ok', UserSessionObject> | APIResponse<'fail', APIError[]>> {
    try {
      const response = await this.root.http.get<UserSessionObject>('/auth/current-user');

      this.root.authenticatedUser = response.data;

      return { status: 'ok', data: response.data as UserSessionObject };
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { errors: APIError[] } } };
      return { status: 'fail', data: axiosError.response.data.errors as APIError[] };
    }
  }

  async login(email: string, password: string, rememberMe: boolean): Promise<APIResponse<'ok', UserSessionObject> | APIResponse<'fail', APIError[]>> {
    try {
      const response = await this.root.http.post<UserSessionObject>(
        '/auth/login',
        { email, password, rememberMe }
      );

      this.root.authenticatedUser = response.data;

      return { status: 'ok', data: response.data as UserSessionObject };
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { errors: APIError[] } } };
      return { status: 'fail', data: axiosError.response.data.errors as APIError[] };
    }
  }

  async register(email: string, password: string): Promise<APIResponse<'ok', UserSessionObject> | APIResponse<'fail', APIError[]>> {
    try {
      const response = await this.root.http.post<UserSessionObject>(
        '/auth/register',
        { email, password }
      );

      this.root.authenticatedUser = response.data;

      return { status: 'ok', data: response.data as UserSessionObject };
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { errors: APIError[] } } };
      return { status: 'fail', data: axiosError.response.data.errors as APIError[] };
    }
  }

  async logout(): Promise<APIResponse<'ok', null> | APIResponse<'fail', APIError[]>> {
    try {
      await this.root.http.post('/auth/logout');

      this.root.authenticatedUser = undefined;
      this.root.emit('userLogout');

      return { status: 'ok', data: null };
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { errors: APIError[] } } };
      return { status: 'fail', data: axiosError.response.data.errors as APIError[] };
    }
  }

  async assumePlayer(playerId: string): Promise<APIResponse<'ok', UserSessionObject> | APIResponse<'fail', APIError[]>> {
    try {
      const response = await this.root.http.post<UserSessionObject>(
        '/auth/assume-player',
        { playerId }
      );

      this.root.authenticatedUser = response.data;

      return { status: 'ok', data: response.data as UserSessionObject };
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { errors: APIError[] } } };
      return { status: 'fail', data: axiosError.response.data.errors as APIError[] };
    }
  }
}
