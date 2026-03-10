// API response helpers

export function successResponse(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    ...data
  })
}

export function errorResponse(res, message, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error: message
  })
}

// Validation helpers
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePAN(pan) {
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return re.test(pan)
}

export function validateAadhaar(aadhaar) {
  const re = /^[0-9]{12}$/
  return re.test(aadhaar.replace(/\s/g, ''))
}

export function validatePhone(phone) {
  const re = /^[6-9]\d{9}$/
  return re.test(phone)
}

export function validateIFSC(ifsc) {
  const re = /^[A-Z]{4}0[A-Z0-9]{6}$/
  return re.test(ifsc)
}

// Pagination helper
export function getPagination(query) {
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10
  const skip = (page - 1) * limit
  
  return { page, limit, skip }
}

// Format currency (INR)
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

// Calculate TDS (10% default)
export function calculateTDS(amount, rate = 0.10) {
  return Number((amount * rate).toFixed(2))
}
