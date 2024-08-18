import { Ref, ref } from 'vue';

export interface Payload {
  name: string;
  ssn: string;
  email: string;
}

export interface ApiResponse {
  status: number;
  data: Payload | Record<string, any>;
}

export abstract class BusinessLogic {
  public name: Ref<string>;
  public ssn: Ref<string>;
  public email: Ref<string>;
  protected onApiError: (error: Error) => void;

  constructor(onApiError: (error: Error) => void) {
    this.name = ref<string>('');
    this.ssn = ref<string>('');
    this.email = ref<string>('');
    this.onApiError = onApiError;
  }

  abstract handleChannelTagChange(): void;

  public validateInput(): void {
    if (!this.name.value || !this.ssn.value || !this.email.value) {
      throw new Error('All fields must be filled');
    }
    if (!this.email.value.includes('@')) {
      throw new Error('Invalid email address');
    }
  }

  public preparePayload(): Payload {
    return {
      name: this.name.value.trim(),
      ssn: this.ssn.value.replace(/-/g, ''),
      email: this.email.value.trim().toLowerCase(),
    };
  }

  abstract submitForm(): Promise<void>;

  protected handleApiError(error: Error): void {
    this.onApiError(error); // API 에러 처리 로직 실행
  }
}
