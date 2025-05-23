import type { FormData } from '@/types'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

export const EmailTemplate: React.FC<Readonly<FormData>> = ({
  name,
  phone,
  area,
  crop,
  otherCrop,
}) => {
  const firstName = name.split(' ')[0]

  return (
    <Html>
      <Head />
      <Preview>Obrigado por entrar em nossa lista de espera.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Em breve.</Heading>
          <Text style={text}>
            {firstName}, agradecemos por entrar na nossa lista de espera e pela
            sua paciência. Enviaremos uma mensagem quando tivermos algo novo
            para compartilhar.
          </Text>
          <Text style={text}>
            {phone}, {area}, {crop}, {otherCrop}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplate

const main = {
  backgroundColor: '#000000',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  margin: '0 auto',
}

const container = {
  margin: 'auto',
  padding: '96px 20px 64px',
}

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
}

const text = {
  color: '#aaaaaa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 40px',
}
