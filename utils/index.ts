// https://emailregex.com/
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// email validation
export function checkEmail(email: string) {
  if (email.length > 0) return !emailRegex.test(email)

  return false
}

// cellphone mask = (00) 90000-0000
export const maskPhone = (phone: string) => {
  let maskedValue = phone.replace(/^(\d{2})(\d)/g, '($1) $2')
  maskedValue = maskedValue.replace(/(\d{5})(\d)/, '$1-$2')

  return maskedValue
}

// cellpone validator (BR only)
export const validatePhone = (phone: string) => {
  const sanitizedPhone = phone.replace(/\D/g, '')
  const phoneRegex =
    /^(11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)9\d{8}$/

  return phoneRegex.test(sanitizedPhone) && !/^(\d)\1+$/.test(sanitizedPhone)
}

// cellphone mask = (00) 90000-0000
// export const formatCellphone = (value: string) => {
//   const digits = value.replace(/\D/g, '')

//   if (digits.length <= 2) {
//     return `(${digits}`
//   }
//   if (digits.length <= 6) {
//     return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
//   }
//   if (digits.length <= 10) {
//     return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
//   }

//   return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
// }

// number format = 1.000.000
export const maskNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value)
