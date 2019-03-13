// 策略雏形
const strategis = {
  notEmpty: (str) => str.length !== 0,
  phone: (phone) => /^1[34578]\d{9}$/.test(phone),
  email: (email) => return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
}

export function handler (keys) {
  keys.forEach(item => strategis(keys))
}

export default ()=>{}

// handler (['notEmpty', 'phone'])