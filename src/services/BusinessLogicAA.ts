import { BusinessLogic, ApiResponse, Payload } from './BusinessLogic';

export class BusinessLogicAA extends BusinessLogic {
  constructor(onApiError: (error: Error) => void) {
    super(onApiError);
    this.handleChannelTagChange();
  }

  handleChannelTagChange(): void {
    this.name.value = 'Default AA Name';
    this.email.value = 'aa@example.com';
  }

  async submitForm(): Promise<void> {
    try {
      this.validateInput();
      const payload = this.preparePayload();
      const apiResponse = await this.fakeApiCall(payload);
      console.log(`AA API Response:`, apiResponse);
      alert('AA Submission successful!');
    } catch (error) {
      this.handleApiError(error as Error);
    }
  }

  private fakeApiCall(payload: Payload): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3;
        if (isSuccess) {
          resolve({ status: 200, data: payload });
        } else {
          reject(new Error('API Error: AA API failed'));
        }
      }, 1000);
    });
  }
}
