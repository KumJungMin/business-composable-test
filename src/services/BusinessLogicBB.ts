import { BusinessLogic, ApiResponse, Payload } from './BusinessLogic';

export class BusinessLogicBB extends BusinessLogic {
  constructor(onApiError: (error: Error) => void) {
    super(onApiError);
    this.handleChannelTagChange();
  }

  handleChannelTagChange(): void {
    this.name.value = 'Default BB Name';
    this.email.value = 'bb@example.com';
  }

  async submitForm(): Promise<void> {
    try {
      this.validateInput();
      const payload = this.preparePayload();
      const apiResponse = await this.fakeApiCall(payload);
      console.log(`BB API Response:`, apiResponse);
      alert('BB Submission successful!');
    } catch (error) {
      this.handleApiError(error as Error);
    }
  }

  private fakeApiCall(payload: Payload): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.4;
        if (isSuccess) {
          resolve({ status: 200, data: payload });
        } else {
          reject(new Error('API Error: BB API failed'));
        }
      }, 1000);
    });
  }
}
