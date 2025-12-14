<script setup>
import { onMounted, ref, watch, defineProps, defineEmits } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = ref(null);
let quill;

// init quill
onMounted(() => {
  quill = new Quill(editor.value, {
    theme: "snow",
    modules: {
      toolbar: [
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
  quill.root.innerHTML = props.modelValue;

  // on content change → update v-model
  quill.on("text-change", () => {
    const html = quill.root.innerHTML;
    emit("update:modelValue", html);
  });
});

// if v-model updated manually → update editor
watch(
  () => props.modelValue,
  (newVal) => {
    if (quill && quill.root.innerHTML !== newVal) {
      quill.root.innerHTML = newVal;
    }
  }
);
</script>

<template>
  <div>
    <div ref="editor" class="bg-white" style="height: 250px"></div>
  </div>
</template>
