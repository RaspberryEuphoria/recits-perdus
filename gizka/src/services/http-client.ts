class HttpClient {
  constructor(private baseUrl: string) {}

  public async request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, options);
    const data = await res.json();
    return data;
  }

  public async get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  public async post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }

  public async patch<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}

const httpClient = new HttpClient(process.env.API_PREFIX_URL || '');
const httpBffClient = new HttpClient(`${process.env.NEXT_PUBLIC_BFF_PREFIX_URL}/api` || '');

export { httpClient, httpBffClient };
