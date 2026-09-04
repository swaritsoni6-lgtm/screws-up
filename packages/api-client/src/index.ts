import type {
  BookingDTO,
  CreateBookingInput,
  ArtisanDTO,
  ArtisanTelemetryInput,
  LedgerSplitDTO,
  VerifiedPartDTO,
  PanchayatDisputeDTO,
} from "@screws-up/shared-types";

export interface ApiClientConfig {
  baseUrl: string;
  getAuthToken?: () => Promise<string | null> | string | null;
}

export class ScrewsUpApiClient {
  private baseUrl: string;
  private getAuthToken?: () => Promise<string | null> | string | null;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.getAuthToken = config.getAuthToken;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.getAuthToken) {
      const token = await this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error ${response.status}: ${errorBody}`);
    }

    return response.json() as Promise<T>;
  }

  // Health check
  async getHealth(): Promise<{ status: string; service: string }> {
    return this.request<{ status: string; service: string }>("/health");
  }

  // Bookings
  async createBooking(input: CreateBookingInput): Promise<BookingDTO> {
    return this.request<BookingDTO>("/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async getBooking(id: string): Promise<BookingDTO> {
    return this.request<BookingDTO>(`/api/v1/bookings/${id}`);
  }

  // Artisans
  async sendTelemetry(telemetry: ArtisanTelemetryInput): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("/api/v1/artisans/telemetry", {
      method: "POST",
      body: JSON.stringify(telemetry),
    });
  }

  async getArtisanProfile(id: string): Promise<ArtisanDTO> {
    return this.request<ArtisanDTO>(`/api/v1/artisans/${id}`);
  }

  // Parts
  async verifyPartBarcode(bookingId: string, barcode: string): Promise<VerifiedPartDTO> {
    return this.request<VerifiedPartDTO>("/api/v1/parts/verify", {
      method: "POST",
      body: JSON.stringify({ bookingId, barcode }),
    });
  }

  // Disputes
  async getDisputeCase(disputeId: string): Promise<PanchayatDisputeDTO> {
    return this.request<PanchayatDisputeDTO>(`/api/v1/panchayat/cases/${disputeId}`);
  }
}
