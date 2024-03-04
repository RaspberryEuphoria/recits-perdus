/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpError = {
  status: number;
  message: string;
};

class HttpClient {
  constructor(private baseUrl: string) {}

  public async request<T>(url: string, options: RequestInit): Promise<T | HttpError> {
    console.log('Request to');
    console.log(process.env.API_PREFIX_URL);
    console.log(process.env.NEXT_PUBLIC_BFF_PREFIX_URL);

    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        cache: 'no-store',
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        status: err.status,
        message: err.message,
      };
    }
  }

  public async get<T>(url: string): Promise<T | HttpError> {
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  public async post<T>(url: string, body: any): Promise<T | HttpError> {
    return this.request<T>(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body: any): Promise<T | HttpError> {
    return this.request<T>(url, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(url: string): Promise<T | HttpError> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }

  public async patch<T>(url: string, body: any): Promise<T | HttpError> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}

const httpClient = new HttpClient(process.env.API_PREFIX_URL || '');
const httpBffClient = new HttpClient(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}/api` || '');

function isHttpError(data: any): data is HttpError {
  return data.status >= 300;
}

export { httpBffClient, httpClient, isHttpError };
