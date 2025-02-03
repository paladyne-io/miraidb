import { reactive } from 'vue'

export const store = reactive({
  user: {},
  is_guest: true,
  guest_id: null,
  profile: {},
  locale: {},
  tags: [{}],
  saved_tags: [{}],
  route_tag: {}
})
