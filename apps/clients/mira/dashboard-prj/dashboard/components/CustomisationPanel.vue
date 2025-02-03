<template>
  <q-card
    flat
    class="customisation-container q-pa-md"
  >
    <div class="row q-col-gutter-md">
      <!-- Customization Controls -->
      <div class="col-12 col-md-4">
        <q-card class="customization-controls q-pa-md">
          <div class="text-h6 q-mb-md">Style Options</div>

          <div class="row">

            <div class="col-6 col-md-12 control-section q-pr-lg q-mb-lg">
              <div class="text-subtitle2 q-mb-sm">Layout</div>
              <q-select
                outlined
                dense
                emit-value
                map-options
                v-model="selectedLayout"
                :options="layouts"
                label="Select Layout"
                class="q-mb-md"
              />
            </div>

          <div class="col-6 col-md-12 control-section q-mb-lg">
            <div class="text-subtitle2 q-mb-sm">Title Style</div>
            <q-select
              outlined
              dense
              emit-value
              map-options
              v-model="selectedTextEffect"
              :options="textEffects"
              label="Select Text Effect"
              class="q-mb-md"
            />
          </div>

          <div class="col-6 col-md-12 control-section q-pr-lg q-mb-lg">
            <div class="text-subtitle2 q-mb-sm">Animation</div>
            <q-select
              outlined
              dense
              v-model="selectedAnimationEffect"
              :options="animationEffects"
              label="Select Animation"
              class="q-mb-md"
            />
          </div>

          <div class="col-6 col-md-12 control-section q-mb-lg">
            <div class="text-subtitle2 q-mb-sm">Background</div>
            <q-select
              outlined
              dense
              v-model="selectedBackground"
              :options="backgroundOptions"
              label="Select Background"
              class="q-mb-md"
            />
          </div>
        </div>
          <div class="text-center">
            <q-btn
              @click="saveCustomization"
              label="Apply Style"
              color="primary"
            />
          </div>

        </q-card>
      </div>

      <!-- Preview Panel -->
      <div class="col-12 col-md-8">
        <q-card
          class="preview-panel"
          :class="[selectedAnimationEffect]"
          :style="postStyle"
        >
          <q-card-section>
            <!-- Image Above Title Layout -->
            <template v-if="selectedLayout === 'layout1'">
              <div
                class="image-container"
                v-if="imagePreview"
              >
                <q-img
                  :src="imagePreview"
                  style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;"
                />
              </div>
              <div class="title-container text-center q-mt-md">
                <h2
                  :style="textEffectStyle"
                  class="text-h4 q-ma-none"
                >{{ postTitle || 'Your Title Here' }}</h2>
              </div>
            </template>

            <!-- Horizontal Layouts -->
            <template v-else-if="selectedLayout === 'layout2' || selectedLayout === 'layout3'">
              <div class="row items-center">
                <!-- Title Section -->
                <div :class="[
                  'col-6',
                  selectedLayout === 'layout2' ? 'order-first' : 'order-last'
                ]">
                  <div class="q-pa-md">
                    <h2
                      :style="textEffectStyle"
                      class="text-h4 q-ma-none"
                    >{{ postTitle || 'Your Title Here' }}</h2>
                  </div>
                </div>
                <!-- Image Section -->
                <div
                  :class="[
                    'col-6',
                    selectedLayout === 'layout2' ? 'order-last' : 'order-first'
                  ]"
                  v-if="imagePreview"
                >
                  <q-img
                    :src="imagePreview"
                    style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;"
                  />
                </div>
              </div>
            </template>

            <!-- Overlay Layout -->
            <template v-else-if="selectedLayout === 'layout4'">
              <div
                class="overlay-container"
                style="position: relative;"
              >
                <q-img
                  v-if="imagePreview"
                  :src="imagePreview"
                  style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px;"
                />
                <div
                  class="overlay-title"
                  style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                >
                  <h2
                    :style="[textEffectStyle, { textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }]"
                    class="text-h4 q-ma-none"
                  >
                    {{ postTitle || 'Your Title Here' }}
                  </h2>
                </div>
              </div>
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  post: Object,
  postId: String,
  postTitle: String,
  postImage: [String, File],
});

const emit = defineEmits(['updateStyles']);

const selectedLayout = ref('layout1');
const selectedTextEffect = ref('gradient1');
const selectedAnimationEffect = ref('fadeIn');
const selectedBackground = ref('white');
const imagePreview = ref('');

const layouts = [
  { label: 'Image Above Title', value: 'layout1' },
  { label: 'Title Left, Image Right', value: 'layout2' },
  { label: 'Title Right, Image Left', value: 'layout3' },
  { label: 'Title Overlay on Image', value: 'layout4' },
];

const textEffects = [
  { label: 'Sunset Gradient', value: 'gradient1' },
  { label: 'Ocean Gradient', value: 'gradient2' },
  { label: 'Fire Gradient', value: 'gradient3' },
  { label: 'Rainbow Gradient', value: 'gradient4' },
];

const animationEffects = [
  { label: 'Fade In', value: 'fadeIn' },
  { label: 'Slide In', value: 'slideIn' },
  { label: 'Zoom In', value: 'zoomIn' },
  { label: 'Bounce In', value: 'bounceIn' },
];

const backgroundOptions = [
  { label: 'White', value: 'white' },
  { label: 'Light Gray', value: '#f5f5f5' },
  { label: 'Soft Blue', value: '#f0f8ff' },
  { label: 'Warm Beige', value: '#faf0e6' },
];

const saveCustomization = () => {
  const customizationOptions = {
    layout: selectedLayout.value,
    textEffect: selectedTextEffect.value,
    animationEffect: selectedAnimationEffect.value,
    background: selectedBackground.value,
    textEffectStyle: textEffectStyle.value,
    headerStyle: headerStyle.value,
    postStyle: postStyle.value,
  };
  emit('updateStyles', customizationOptions);
};

watch(() => props.postImage, (newImage) => {
  if (newImage) {
    if (newImage instanceof File) {
      imagePreview.value = URL.createObjectURL(newImage);
    } else {
      imagePreview.value = newImage;
    }
  } else {
    imagePreview.value = '';
  }
}, { immediate: true });

const headerStyle = computed(() => {
  const baseStyle = { borderRadius: '8px', overflow: 'hidden' };
  switch (selectedLayout.value) {
    case 'layout1':
      return { ...baseStyle };
    case 'layout2':
    case 'layout3':
      return { ...baseStyle };
    case 'layout4':
      return { ...baseStyle, position: 'relative' };
    default:
      return baseStyle;
  }
});

const postStyle = computed(() => ({
  transition: 'all 0.3s ease',
  borderRadius: '8px',
  background: selectedBackground.value,
}));

const textEffectStyle = computed(() => {
  const baseStyle = {
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    transition: 'all 0.3s ease',
    margin: 0,
  };

  switch (selectedTextEffect.value) {
    case 'gradient1':
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      };
    case 'gradient2':
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
      };
    case 'gradient3':
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(to right, #ff6a00, #ee0979)',
      };
    case 'gradient4':
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(to right, #f22, #f2f, #22f, #2ff, #2f2, #ff2)',
      };
    default:
      return baseStyle;
  }
});

onBeforeUnmount(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }
});
</script>


<style scoped>
/*
.body--light .post-form {
  background: #f5f3f3;
}

.body--light .q-field {
  background: white;
}

.body--light a {
  color: #045aa1;
}
*/

.body--dark .preview-panel {
  background: #1d1d1d;
}

.body--dark .q-field {
  background: #151414;
}

.body--dark a {
  color: #78b5e7;
}

.body--light .customisation-container {
  background: white;
}

.body--light .customization-controls {
  background: white;
  height: 100%;
}

.body--light .preview-panel {
  background: white;
}

.body--light .preview-panel {
  min-height: 400px;
  transition: all 0.3s ease;
}

.control-section {
  border-bottom: 1px solid #eee;
}

/* Animation Classes */
.fadeIn {
  animation: fadeIn 0.5s ease-in;
}

.slideIn {
  animation: slideIn 0.5s ease-out;
}

.zoomIn {
  animation: zoomIn 0.5s ease-out;
}

.bounceIn {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Dark mode specific styles */
:deep(.q-dark) .customisation-container {
  background: #1d1d1d;
}

:deep(.q-dark) .customization-controls {
  background: #2d2d2d;
}

:deep(.q-dark) .preview-panel {
  background: #2d2d2d;
}

:deep(.q-dark) .control-section {
  border-bottom-color: #3d3d3d;
}
</style>
