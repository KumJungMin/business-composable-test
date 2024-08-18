<template>
  <div class="form-container">
    <label for="channel">Channel Tag:</label>
    <select v-model="selectedChannel" @change="changeBusinessLogic">
      <option value="AA">AA</option>
      <option value="BB">BB</option>
      <option value="CC">CC</option>
    </select>

    <label for="name">Name:</label>
    <input
      ref="nameRef"
      type="text"
      id="name"
      v-model="businessLogic.name"
      @input="onEnglishInput"
      @focus="scrollToInput(nameRef)"
    />

    <label for="ssn">주민등록번호:</label>
    <input
      ref="ssnRef"
      type="text"
      id="ssn"
      v-model="businessLogic.ssn"
      @focus="scrollToInput(ssnRef)"
    />

    <label for="email">Email:</label>
    <input
      ref="emailRef"
      type="email"
      id="email"
      v-model="businessLogic.email"
      @focus="scrollToInput(emailRef)"
    />

    <button @click="businessLogic.submitForm">Submit</button>

    <!-- Popup Modal -->
    <Popup :isVisible="isVisible" :message="message" @close="closePopup" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScrollToInput } from "../composables/useScrollToInput";
import { usePopup } from "../composables/usePopup";
import { useInputValidate } from "../composables/useInputValidate";

import { BusinessLogic } from "../services/BusinessLogic";
import { BusinessLogicAA } from "../services/BusinessLogicAA";
import { BusinessLogicBB } from "../services/BusinessLogicBB";
import { BusinessLogicCC } from "../services/BusinessLogicCC";
import Popup from "../components/Popup.vue";

const { scrollToInput } = useScrollToInput();
const { isVisible, message, show, close } = usePopup();
const { onEnglishInput } = useInputValidate();

const selectedChannel = ref<"AA" | "BB" | "CC">("AA");
const businessLogic = ref<BusinessLogic | null>(null); // 반응형 변수로 선언

const nameRef = ref<HTMLElement | null>(null);
const ssnRef = ref<HTMLElement | null>(null);
const emailRef = ref<HTMLElement | null>(null);

// 에러 콜백 함수
const handleApiError = (error: Error) => {
  // AA와 CC에서는 팝업을 띄우고, BB에서는 콘솔에만 로그를 남김
  if (selectedChannel.value === "AA" || selectedChannel.value === "CC") {
    show(`Error: ${error.message}`);
  } else {
    console.error("BB-specific error:", error.message);
  }
};

const changeBusinessLogic = () => {
  switch (selectedChannel.value) {
    case "AA":
      businessLogic.value = new BusinessLogicAA(handleApiError);
      break;
    case "BB":
      businessLogic.value = new BusinessLogicBB(handleApiError);
      break;
    case "CC":
      businessLogic.value = new BusinessLogicCC(handleApiError);
      break;
  }
};

// 초기 로드 시 기본 비즈니스 로직 설정
changeBusinessLogic();

const closePopup = () => {
  close();
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

input,
select {
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
