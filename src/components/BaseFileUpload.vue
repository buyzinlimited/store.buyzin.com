<script setup>
import apiClient from '@/utils/axios'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
    label: { type: String, default: 'Upload File' },
    name: { type: String, default: 'file' },
    server: { type: String, required: true },
    multiple: { type: Boolean, default: false },
    accept: { type: Array, default: () => ['image/webp'] },
})

const emit = defineEmits(['uploaded', 'error'])

const files = ref([]);
const uploading = ref(false)
const error = ref('')

const handleFileChange = (event) => {
    error.value = ''
    const selected = Array.from(event.target.files)
    const invalid = selected.filter(file => !props.accept.includes(file.type))
    if (invalid.length) {
        error.value = `Invalid file type: ${invalid.map(f => f.name).join(', ')}`
        return
    }
    const filesWithPreview = selected.map(file => ({ file, preview: URL.createObjectURL(file), uploaded: false }))
    files.value = props.multiple ? filesWithPreview : [filesWithPreview[0]]
}

const removeFile = (index) => {
    URL.revokeObjectURL(files.value[index].preview)
    files.value.splice(index, 1)
}

const uploadFiles = async () => {
    if (!files.value.length) {
        error.value = 'Please select a file first.'
        return
    }

    error.value = ''

    try {
        const formData = new FormData()
        files.value.forEach(f => formData.append(props.name, f.file))

        const response = await apiClient.post(props.server, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        files.value = files.value.map(f => ({ ...f, uploaded: true }))
        emit('uploaded', response.data)
    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Upload failed'
        error.value = message
        emit('error', message)
    }
}
</script>

<template>
    <div class="w-full mb-3">
        <label class="block mb-2 text-sm font-medium">{{ label }}</label>

        <div class="relative">
            <input type="file" :multiple="multiple" :accept="accept.join(',')" @change="handleFileChange"
                class="w-full pr-28 border rounded text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-200 file:text-gray-700 file:rounded-l file:cursor-pointer" />

            <button type="button" @click="uploadFiles" :disabled="uploading || !files.length"
                class="absolute top-0 right-0 h-full px-2 bg-primary text-white rounded-r hover:bg-primary/80 disabled:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
            </button>
        </div>

        <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>

        <ul v-if="files.length" class="mt-2 text-sm text-gray-600 space-y-1">
            <li v-for="(file, index) in files" :key="index" class="flex justify-between items-center">
                <span>{{ file.file.name }}</span>
                <button @click="removeFile(index)" class="text-red-500 hover:underline text-xs">Remove</button>
            </li>
        </ul>
    </div>
</template>
