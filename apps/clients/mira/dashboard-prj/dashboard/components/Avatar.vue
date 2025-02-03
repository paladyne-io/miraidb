<template>
    <div>
        <img
            v-if="src"
            :src="src"
            alt="Avatar"
            class="circle avatar image"
            :style="{ height: size + 'em', width: size + 'em' }"
        />
        <div
            v-else
            class="avatar no-image"
            :style="{ height: size + 'em', width: size + 'em' }"
        />
    </div>
    <div :style="{ width: size + 'em' }">
        <q-btn
            flat
            rounded
            color="primary"
            class="upload-button q-mt-sm"
            :disabled="uploading"
            icon="upload"
            :label="uploading ? 'Uploading ...' : 'Change Avatar'"
            @click="triggerFileInput"
        />

        <input
            style="visibility: hidden; position: absolute"
            type="file"
            id="single"
            accept="image/*"
            ref="fileInput"
            @change="uploadAvatar"
            :disabled="uploading"
        />
    </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { supabase } from '../../../shared/supabase'

// const { loading, error, getSignedInUserProfile } = useSupabaseAPI();

const prop = defineProps(['path', 'size'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()
const fileInput = ref(null)

const downloadAvatar = async () => {
    console.log("Download avatar...")
    
    try {
        const { data, error } = await supabase.storage
            .from('avatars')
            .download(path.value)
        if (error) throw error
        src.value = URL.createObjectURL(data)
    } catch (error) {
        console.error('Error downloading image: ', error.message)
    }
}

const triggerFileInput = () => {
    fileInput.value.click()
}

const uploadAvatar = async (evt) => {
    files.value = evt.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`

        let { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadError) throw uploadError
        emit('update:path', filePath)
        emit('upload')
    } catch (error) {
        alert(error.message)
    } finally {
        uploading.value = false
    }
}

watch(path, () => {
    if (path.value) downloadAvatar()
})
</script>

<style scoped>
.circle {
    border-radius: 50%;
    border: 4px solid #e0e0e0;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.circle:hover {
    border-color: var(--q-primary);
    transform: scale(1.02);
}

.circle img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
