<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-center">Base Converter</h1>

    <!-- Input field -->
    <div>
      <label class="block mb-1 font-medium">Value:</label>
      <input
        v-model="inputValue"
        type="text"
        placeholder="Enter value (e.g., 1B)"
        class="w-full p-2 border rounded-md"
      />
    </div>

    <!-- From / To Base -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block mb-1 font-medium">From Base:</label>
        <input
          v-model.number="fromBase"
          type="number"
          min="2"
          max="36"
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">To Base:</label>
        <input
          v-model.number="toBase"
          type="number"
          min="2"
          max="36"
          class="w-full p-2 border rounded-md"
        />
      </div>
    </div>

    <!-- Convert Button -->
    <button
      @click="convertBase"
      :disabled="loading"
      class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
    >
      {{ loading ? "Converting..." : "Convert" }}
    </button>

    <!-- Result -->
    <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded-md">
      <p>
        <span class="font-semibold">{{ result.original }}</span> (base {{ result.fromBase }})
        =
        <span class="font-bold">{{ result.converted }}</span> (base {{ result.toBase }})
      </p>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");
const fromBase = ref(10);
const toBase = ref(2);
const result = ref(null);
const loading = ref(false);
const error = ref("");

async function convertBase() {
  if (!inputValue.value) {
    error.value = "Please enter a value.";
    result.value = null;
    return;
  }

  error.value = "";
  result.value = null;
  loading.value = true;

  try {
    const res = await fetch(
      "https://baseconverter-a3a9dmcbdhdkhwfu.southafricanorth-01.azurewebsites.net/api/convert",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: inputValue.value,
          fromBase: fromBase.value,
          toBase: toBase.value,
        }),
      }
    );

    if (!res.ok) throw new Error("Conversion failed.");

    const data = await res.json();
    result.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>
