// Nuxt 3 plugin for parallax effect
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('parallax', {
    getSSRProps() {
      // Return empty props for SSR
      return {}
    },
    mounted(el, binding) {
      if (process.client) {
        const handleMouseMove = (e) => {
          const depth = binding.value || 0.2
          const x = (window.innerWidth - e.pageX * depth) / 90
          const y = (window.innerHeight - e.pageY * depth) / 90

          requestAnimationFrame(() => {
            el.style.transform = `translateX(${x}px) translateY(${y}px)`
          })
        }

        el.style.transition = 'transform 0.2s ease-out'
        el.style.willChange = 'transform'

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove)

        // Cleanup
        el._parallaxCleanup = () => {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      }
    },
    unmounted(el) {
      if (process.client && el._parallaxCleanup) {
        el._parallaxCleanup()
      }
    }
  })
})
