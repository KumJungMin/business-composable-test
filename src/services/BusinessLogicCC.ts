import { BusinessLogic, ApiResponse, Payload } from './BusinessLogic';

export class BusinessLogicCC extends BusinessLogic {
  constructor(onApiError: (error: Error) => void) {
    super(onApiError);
    this.handleChannelTagChange();
  }

  handleChannelTagChange(): void {
    this.name.value = 'Default CC Name';
    this.email.value = 'cc@example.com';
  }

  async submitForm(): Promise<void> {
    try {
      this.validateInput();
      const payload = this.preparePayload();
      const apiResponse = await this.fakeApiCall(payload);
      console.log(`CC API Response:`, apiResponse);
      alert('CC Submission successful!');
    } catch (error) {
      this.handleApiError(error as Error);
    }
  }

  handleApiError(error: Error): void {
    console.error('CC-specific Error:', error.message);
  }

  private fakeApiCall(payload: Payload): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve({ status: 200, data: payload });
        } else {
          reject(new Error('API Error: CC API failed'));
        }
      }, 1000);
    });
  }
}
