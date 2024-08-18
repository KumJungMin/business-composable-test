<template>
  <div class="form-container">
    <label for="name">Name:</label>
    <input
      type="text"
      id="name"
      v-model="name"
      @focus="scrollToInput('name')"
    />

    <label for="ssn">주민등록번호:</label>
    <input type="text" id="ssn" v-model="ssn" @focus="scrollToInput('ssn')" />

    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      v-model="email"
      @focus="scrollToInput('email')"
    />

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// 타입 정의
type ChannelTag = "AA" | "BB" | "CC";

interface Payload {
  name: string;
  ssn: string;
  email: string;
}

interface ApiResponse {
  status: number;
  data: Payload | Record<string, any>;
}

// 반응형 변수 정의
const channelTag = ref<ChannelTag>("AA");
const name = ref<string>("");
const ssn = ref<string>("");
const email = ref<string>("");

// watch 함수로 channelTag 값 변경 감지
watch(channelTag, (newTag) => {
  handleChannelTagChange(newTag);
});

// channelTag 변경 시 처리 로직
const handleChannelTagChange = (newTag: ChannelTag): void => {
  switch (newTag) {
    case "AA":
      name.value = "Default AA Name";
      email.value = "aa@example.com";
      break;
    case "BB":
      name.value = "Default BB Name";
      email.value = "bb@example.com";
      break;
    case "CC":
      name.value = "Default CC Name";
      email.value = "cc@example.com";
      break;
  }
};

// 스크롤 함수
const scrollToInput = (inputId: string): void => {
  const element = document.getElementById(inputId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// 폼 제출 함수
const submitForm = async (): Promise<void> => {
  try {
    // 1. 데이터 유효성 검사
    validateInput();

    // 2. 데이터 정제 및 추가 작업
    const payload = preparePayload();

    // 3. channelTag에 따라 다른 API 호출
    let apiResponse: ApiResponse;
    if (channelTag.value === "AA") {
      apiResponse = await fakeApiCallAA(payload);
    } else if (channelTag.value === "BB") {
      apiResponse = await fakeApiCallBB(payload);
    } else {
      apiResponse = await fakeApiCallCC(payload);
    }

    console.log(`${channelTag.value} API Response:`, apiResponse);

    // 4. API 호출 성공 시 처리
    if (apiResponse.status === 200) {
      finalizeProcess(apiResponse);
    } else {
      throw new Error(`${channelTag.value} API failed`);
    }
  } catch (error) {
    // 5. 에러 발생 시 로깅 및 사용자 피드백
    logError(error as Error);
    handleUserFeedback(error as Error);
  }
};

// 입력 데이터 유효성 검사 함수
const validateInput = (): void => {
  if (!name.value || !ssn.value || !email.value) {
    throw new Error("All fields must be filled");
  }
  if (!email.value.includes("@")) {
    throw new Error("Invalid email address");
  }
};

// 데이터 정제 함수
const preparePayload = (): Payload => {
  return {
    name: name.value.trim(),
    ssn: ssn.value.replace(/-/g, ""),
    email: email.value.trim().toLowerCase(),
  };
};

// 최종 처리 함수
const finalizeProcess = (response: ApiResponse): void => {
  console.log("Finalizing process with:", response);
  alert("Submission successful!");
};

// 가상 API 호출 함수 for AA
const fakeApiCallAA = (payload: Payload): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% 성공 확률
      if (isSuccess) {
        resolve({ status: 200, data: payload });
      } else {
        reject(new Error("API Error: AA API failed"));
      }
    }, 1000);
  });
};

// 가상 API 호출 함수 for BB
const fakeApiCallBB = (payload: Payload): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.4; // 60% 성공 확률
      if (isSuccess) {
        resolve({ status: 200, data: payload });
      } else {
        reject(new Error("API Error: BB API failed"));
      }
    }, 1000);
  });
};

// 가상 API 호출 함수 for CC
const fakeApiCallCC = (payload: Payload): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // 50% 성공 확률
      if (isSuccess) {
        resolve({ status: 200, data: payload });
      } else {
        reject(new Error("API Error: CC API failed"));
      }
    }, 1000);
  });
};

// 에러 로깅 함수
const logError = (error: Error): void => {
  console.error("Logging Error:", error.message);
};

// 사용자 피드백 함수
const handleUserFeedback = (error: Error): void => {
  alert(`An error occurred: ${error.message}`);
};
</script>

<style>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 20px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
