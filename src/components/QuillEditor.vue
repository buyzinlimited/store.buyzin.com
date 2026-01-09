<script setup>
import { onMounted, ref, watch } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const editor = ref(null);
let quill;

// init quill
onMounted(() => {
  quill = new Quill(editor.value, {
    theme: "snow",
    readOnly: props.disabled,
    placeholder: props.placeholder,
    modules: {
      toolbar: props.disabled
        ? false
        : [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, 3, false] }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
    },
  });

  // set initial value from v-model
  quill.root.innerHTML = props.modelValue || "";

  // on content change → update v-model
  quill.on("text-change", () => {
    emit("update:modelValue", quill.root.innerHTML);
  });
});

// if v-model updated manually → update editor
watch(
  () => props.modelValue,
  (val) => {
    if (quill && quill.root.innerHTML !== val) {
      quill.root.innerHTML = val || "";
    }
  }
);

watch(
  () => props.disabled,
  (val) => {
    if (quill) quill.enable(!val);
  }
);
</script>

<template>
  <div class="space-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div :class="[
      'rounded border',
      error ? 'border-red-500' : 'border-gray-300',
      disabled ? 'bg-gray-100' : 'bg-white'
    ]">
      <div ref="editor" class="bg-white" style="height: 250px"></div>
    </div>
    <small v-if="error" class="text-sm text-red-500">
      {{ error[0] }}
    </small>
  </div>
</template>
