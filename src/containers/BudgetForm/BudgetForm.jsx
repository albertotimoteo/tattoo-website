import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material'
import { tatooTypeOptions, localeOptions } from './budgetFormOptions'

import { useOptions } from '../../store/options'

import { prepareBudgetPayload } from '../../utils/preparePayload'
import { uploadFiles } from '../../utils/sendToDrive'
import { addInfo } from '../../utils/sendToSpreadsheet'
import InputMask from 'react-input-mask'
import { fetchAddress } from '../../utils/fetchAdress'

import Button from '../../components/Button/Button.styled'
import * as S from '../FlashForm/FlashForm.styled'

const BudgetForm = () => {
  const [step, setStep] = useState(0)
  const [checks, setChecks] = useState({ age: null, vaccine: null })
  const [termCheck, setTermCheck] = useState(false)
  const [buttonText, setButtonText] = useState('Continuar')
  const [fileList, setFileList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState(
    'As imagens foram enviadas com sucesso! Você ainda deve clicar em continuar para terminar de preencher o formulário!'
  )
  const { $options } = useOptions()
  const { dias_orcamento, horas_orcamento, meses_orcamento, tamanhos, isBookingBudget } =
    $options
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    preferredDay: {},
    preferredMonth: {},
    preferredHour: {},
    address: {
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
    },
    tatooIdea: '',
    tatooType: '',
    tatooSize: '',
    otherSize: '',
    bodyPlacement: '',
    otherPlacement: '',
    referencesSent: false,
    cover: null,
    oldTattooSize: '',
  })
  

  const history = useHistory()

  const stepsRender = [
    <>
      <p>
        Antes de clicar em Continuar, certifique-se que você leu as{' '}
        <a href='/condicoes-agendamento' target='_blank'>
          Condições de Agendamento.
        </a>{' '}
      </p>
      <p>Atente-se nas informações a seguir:</p>
      <ul>
        <S.ListItem>
          A Mari não atende menores de idade mesmo com a autorização de
          responsáveis.
        </S.ListItem>
        <S.ListItem>
          A Mari trabalha com coberturas, porém apenas com desenhos por
          encomenda.
        </S.ListItem>
        <S.ListItem>
          Os produtos utilizados na sua tatuagem (agulha, tinta, luva, papel
          toalha etc) são de uso individual e serão descartados após o término
          do procedimento. Além disso, todos os produtos utilizados na sua
          tatuagem são veganos e não testados em animais.
        </S.ListItem>
        <S.ListItem>
          Para reserva de um desenho autoral exclusivo é cobrado um sinal de 100
          reais, que pode ser feito via transferência, Pix ou boleto.
        </S.ListItem>
        <S.ListItem>
          O estúdio da Mari fica localizado no bairro Funcionários e o endereço
          será divulgado a você após o pagamento do sinal.
        </S.ListItem>
        <S.ListItem>
          O orçamento possui um prazo de validade de <strong>90 dias.</strong>
        </S.ListItem>
      </ul>
    </>,
    <>
      <S.Row>
        <label>Você tem 18 anos ou mais?</label>
        <div>
          <input
            type='radio'
            id='yesAge'
            name='ageCheck'
            value='yes'
            onChange={event =>
              setChecks({ ...checks, age: event.target.value })
            }
          ></input>
          <label htmlFor='yesAge'>Sim</label>
          <input
            type='radio'
            id='noAge'
            name='ageCheck'
            value='no'
            onChange={event =>
              setChecks({ ...checks, age: event.target.value })
            }
          ></input>
          <label htmlFor='noAge'>Não</label>
        </div>
      </S.Row>
      <S.Row>
        <label>
          Você já tomou pelo menos as duas doses da vacina contra a COVID-19?
        </label>
        <div>
          <input
            type='radio'
            id='yesVaccine'
            name='vaccineCheck'
            value='yes'
            onChange={event =>
              setChecks({ ...checks, vaccine: event.target.value })
            }
          ></input>
          <label htmlFor='yes'>Sim</label>
          <input
            type='radio'
            id='noVaccine'
            name='vaccineCheck'
            value='no'
            onChange={event =>
              setChecks({ ...checks, vaccine: event.target.value })
            }
          ></input>
          <label htmlFor='no'>Não</label>
        </div>
      </S.Row>
    </>,
    <>
      <S.Row>
        <TextField
          label='Nome'
          variant='standard'
          value={formData.nome}
          onChange={event =>
            setFormData({ ...formData, nome: event.target.value })
          }
          color='primary'
        />
      </S.Row>
      <S.Row>
        <TextField
          label='E-mail'
          variant='standard'
          value={formData.email}
          onChange={event =>
            setFormData({ ...formData, email: event.target.value })
          }
          color='primary'
        />
      </S.Row>
      <S.Row>
        <InputMask
          mask='999.999.999-99'
          value={formData.cpf}
          onChange={event =>
            setFormData({ ...formData, cpf: event.target.value })
          }
        >
          {inputProps => (
            <TextField
              label='CPF'
              variant='standard'
              color='primary'
              {...inputProps}
            />
          )}
        </InputMask>
      </S.Row>
      <S.Row>
        <strong>Endereço</strong>
      </S.Row>
      <S.Row>
        <InputMask
          mask='99.999-999'
          value={formData.address.cep}
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, cep: event.target.value },
            })
          }
          onBlur={async () => {
            const data = await fetchAddress(
              formData.address.cep.replaceAll('.', '').replace('-', '')
            )
            if (data) {
              const { logradouro, bairro, localidade, uf } = data
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  street: logradouro,
                  neighborhood: bairro,
                  city: localidade,
                  state: uf,
                },
              })
            }
          }}
        >
          {inputProps => (
            <TextField
              label='CEP'
              variant='standard'
              color='primary'
              {...inputProps}
            />
          )}
        </InputMask>
      </S.Row>
      <S.Row>
        <TextField
          label='Rua/Avenida'
          variant='standard'
          color='primary'
          value={formData.address.street}
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, street: event.target.value },
            })
          }
        />
      </S.Row>
      <S.Row>
        <TextField
          label='Número'
          variant='standard'
          color='primary'
          value={formData.address.number}
          type='number'
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, number: event.target.value },
            })
          }
        />
      </S.Row>
      <S.Row>
        <TextField
          label='Complemento'
          variant='standard'
          color='primary'
          value={formData.address.complement}
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, complement: event.target.value },
            })
          }
        />
      </S.Row>
      <S.Row>
        <TextField
          label='Bairro'
          variant='standard'
          color='primary'
          value={formData.address.neighborhood}
          onChange={event =>
            setFormData({
              ...formData,
              address: {
                ...formData.address,
                neighborhood: event.target.value,
              },
            })
          }
        />
      </S.Row>
      <S.Row>
        <TextField
          label='Cidade'
          variant='standard'
          color='primary'
          value={formData.address.city}
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, city: event.target.value },
            })
          }
        />
      </S.Row>
      <S.Row>
        <TextField
          label='Estado'
          variant='standard'
          color='primary'
          value={formData.address.state}
          inputProps={{ maxLength: 2 }}
          onChange={event =>
            setFormData({
              ...formData,
              address: { ...formData.address, state: event.target.value },
            })
          }
        />
      </S.Row>
    </>,
    <>
      <S.Row>
        <label>
          Quais dias da semana você pode? Marque quantas opções quiser
        </label>
        <div>
          {dias_orcamento.map(day => (
            <React.Fragment key={day}>
              <input
                type='checkbox'
                id={day.toLowerCase()}
                name='preferredDay'
                value={day.toLowerCase()}
                onChange={event =>
                  setFormData({
                    ...formData,
                    preferredDay: {
                      ...formData.preferredDay,
                      [day]: event.target.checked ? 'sim' : 'não',
                    },
                  })
                }
              />
              <label htmlFor={day.toLowerCase()}>{day}</label>
            </React.Fragment>
          ))}
        </div>
      </S.Row>
      <S.Row>
        <label>Quais horários você pode? Marque quantas opções quiser</label>
        <div>
          {horas_orcamento.map(hour => (
            <React.Fragment key={hour}>
              <input
                type='checkbox'
                id={hour}
                name='preferredHour'
                value={hour}
                onChange={event =>
                  setFormData({
                    ...formData,
                    preferredHour: {
                      ...formData.preferredHour,
                      [hour]: event.target.checked ? 'sim' : 'não',
                    },
                  })
                }
              />
              <label htmlFor={hour}>Às {hour}</label>
            </React.Fragment>
          ))}
        </div>
      </S.Row>
      <S.Row>
        <label>Qual a sua preferência de mês?</label>
        <div>
          {meses_orcamento.map(month => (
            <React.Fragment key={month}>
              <input
                type='checkbox'
                id={month}
                name='preferredMonth'
                value={month}
                onChange={event =>
                  setFormData({
                    ...formData,
                    preferredMonth: {
                      ...formData.preferredMonth,
                      [month]: event.target.checked ? 'sim' : 'não',
                    },
                  })
                }
              />
              <label htmlFor={month}>{month}</label>
            </React.Fragment>
          ))}
        </div>
      </S.Row>
    </>,
    <>
      <S.Row>
        <TextField
          label='Me conte um pouco sobre a sua ideia'
          variant='standard'
          value={formData.tatooIdea}
          onChange={event =>
            setFormData({ ...formData, tatooIdea: event.target.value })
          }
          color='primary'
          multiline
          helperText='ex: quero fazer um raminho com duas orquídeas e folhas. Gostaria que as orquídeas tivessem tamanhos diferentes e que o raminho tivesse brotos tambem'
        />
      </S.Row>
      <S.Row>
        <p>Sua tatuagem será preta ou colorida?</p>
        <Select
          value={formData.tatooType}
          onChange={event =>
            setFormData({ ...formData, tatooType: event.target.value })
          }
          variant='standard'
        >
          {tatooTypeOptions.map(type => (
            <MenuItem value={type.value}>{type.text}</MenuItem>
          ))}
        </Select>
      </S.Row>
      <S.Row>
        <p>
          Tamanho em cm (o valor da sua tatuagem varia em relação ao tamanho,
          então meça a região com uma fita métrica){' '}
        </p>
        <Select
          value={formData.tatooSize}
          onChange={event =>
            setFormData({ ...formData, tatooSize: event.target.value })
          }
          variant='standard'
        >
          {tamanhos.length &&
            tamanhos.map(size => (
              <MenuItem
                value={isNaN(Number(size)) ? 'outro' : Number(size)}
              >{`${size.replace('.', ',')}${
                !isNaN(Number(size)) ? 'cm' : ''
              }`}</MenuItem>
            ))}
        </Select>
      </S.Row>
      {formData.tatooSize === 'outro' && (
        <S.Row>
          <TextField
            label='Qual o tamanho?'
            variant='standard'
            value={formData.otherSize}
            onChange={event =>
              setFormData({ ...formData, otherSize: event.target.value })
            }
            color='primary'
          />
        </S.Row>
      )}
      <S.Row>
        <label htmlFor='cover' className='cover'>
          A sua tatuagem será uma cobertura?
        </label>
        <div>
          <input
            type='radio'
            id='yesCover'
            name='cover'
            value='sim'
            onChange={event =>
              setFormData({ ...formData, cover: event.target.value })
            }
          ></input>
          <label htmlFor='yesCover'>Sim</label>
          <input
            type='radio'
            id='noCover'
            name='cover'
            value='nao'
            onChange={event =>
              setFormData({
                ...formData,
                cover: event.target.value,
                oldTattooSize: '',
              })
            }
          ></input>
          <label htmlFor='noCover'>Não</label>
        </div>
      </S.Row>
      {formData.cover === 'sim' && (
        <S.Row>
          <TextField
            label='Qual o tamanho da tatuagem que você vai cobrir? (Em cm)'
            variant='standard'
            value={formData.oldTattooSize}
            type='number'
            onChange={event =>
              setFormData({ ...formData, oldTattooSize: event.target.value })
            }
            color='primary'
          />
        </S.Row>
      )}
      <S.Row>
        <p>Local escolhido para ser tatuado</p>
        <Select
          value={formData.bodyPlacement}
          onChange={event =>
            setFormData({ ...formData, bodyPlacement: event.target.value })
          }
          variant='standard'
        >
          {localeOptions.map(type => (
            <MenuItem value={type.value}>{type.text}</MenuItem>
          ))}
        </Select>
      </S.Row>
      {formData.bodyPlacement === 'outro' && (
        <S.Row>
          <TextField
            label='Qual o local?'
            variant='standard'
            value={formData.otherPlacement}
            onChange={event =>
              setFormData({ ...formData, otherPlacement: event.target.value })
            }
            color='primary'
          />
        </S.Row>
      )}
      <S.Row>
        <label htmlFor='reference' className='reference'>
          Imagens de referência
        </label>
        <input
          id='reference'
          type='file'
          onChange={event => setFileList(event.target.files)}
          multiple
          accept='image/*'
          webkitdirectory
        />
        <S.FileUpload>
          <Button
            disabled={isLoading}
            onClick={async () => {
              setLoading(true)
              const googleSent = await uploadFiles(
                formData.nome,
                formData.cpf,
                fileList
              )
              setFormData({ ...formData, referencesSent: googleSent })
              if (googleSent) {
                setOpen(true)
              }
              setLoading(false)
            }}
          >
            Enviar
          </Button>
          <label>Selecione as imagens e clique no botão enviar.</label>
        </S.FileUpload>
      </S.Row>
    </>,
    <>
      <S.Row>
        <label>
          Tudo pronto! Agora leia os termos abaixo e marque a caixinha caso
          esteja de acordo com <strong>todos</strong> os pontos.
        </label>
        <ul>
          <S.ListItem>
            Concordo com a divulgação de imagens da minha tattoo.
          </S.ListItem>
          <S.ListItem>
            Confirmo estar ciente que será cobrado um sinal de 100 reais e esse
            valor não será devolvido em casos de desistências.
          </S.ListItem>
          <S.ListItem>
            Confirmo que o prazo para remarcação sem custo adicional é de até 7
            dias anteriores a minha sessão. Caso contrário será cobrada outra
            taxa para remarcação.
          </S.ListItem>
          <S.ListItem>
            Confirmo estar ciente que será cobrado um valor de 100 reais para
            retoque caso seja necessário.{' '}
          </S.ListItem>
        </ul>
        <div>
          <input
            id='termCheckbox'
            type='checkbox'
            onChange={event => setTermCheck(event.target.checked)}
          />
          <label htmlFor='termCheckbox'>
            Declaro que li os termos e as regras e estou de acordo com as
            informações colocadas.
          </label>
        </div>
      </S.Row>
    </>,
  ]

  const handleContinue = async () => {
    switch (step) {
      case 0:
        return setStep(1)
      case 1:
        if (!checks.age || !checks.vaccine) return
        if (checks.age === 'no' || checks.vaccine === 'no') {
          history.push('/')
          return
        }
        return setStep(2)
      case 2:
        if (
          !formData.nome ||
          !formData.email ||
          !formData.cpf ||
          !formData.address.cep ||
          !formData.address.street ||
          !formData.address.number ||
          !formData.address.neighborhood ||
          !formData.address.city ||
          !formData.address.state
        )
          return
        return setStep(3)
      case 3:
        const { preferredDay, preferredHour, preferredMonth } = formData
        if (
          !Object.values(preferredDay).length ||
          !Object.values(preferredHour).length ||
          !Object.values(preferredMonth).length
        )
          return
        return setStep(4)
      case 4:
        if (
          !formData.tatooIdea ||
          !formData.tatooType ||
          !formData.tatooSize ||
          !formData.bodyPlacement
        )
          return
        if (formData.tatooSize === 'outro' && !formData.otherSize) return
        if (formData.bodyPlacement === 'outro' && !formData.otherPlacement)
          return
        if (formData.cover === 'sim' && !formData.oldTattooSize) return
        setButtonText('Enviar')
        return setStep(5)
      case 5:
        if (!termCheck) return
        setLoading(true)
        const payload = prepareBudgetPayload(formData)
        const response = await addInfo('budget', payload)
        setLoading(false)
        if (response) {
          setModalMessage(
            'O seu formulário foi enviado e em breve entraremos em contato com você!'
          )
          setOpen(true)
        }
        return
      default:
    }
  }

  if (!isBookingBudget) {
    return (
      <S.Wrapper>
        <h3>Novo Orçamento</h3>
        <>
          <S.Row>
            Como o número de pessoas interessadas em tatuar comigo é muito alto,
            eu tive que adotar o método de agendamento por abertura de agenda.
          </S.Row>
          <S.Row>
            E, no momento, minha agenda está fechada. Por enquanto não temos
            previsão de abertura, mas informaremos por aqui e pelo instagram
            quando acontecer.
          </S.Row>
          <S.Row>
            Quando o formulário de orçamentos está aberto, ele permanece aberto
            até que as vagas sejam preenchidas (geralmente se mantém aberto por
            1 dia)
          </S.Row>
          <S.Row>Um beijo e nos vemos na próxima abertura!</S.Row>
        </>
      </S.Wrapper>
    )
  }

  if (!dias_orcamento.length) {
    return <S.Wrapper>Carregando...</S.Wrapper>
  }

  return (
    <S.Wrapper>
      <h3>Novo Orçamento</h3>
      <>
        {stepsRender[step]}
        <div>
          {step > 2 && (
            <Button onClick={() => setStep(step - 1)} disabled={isLoading}>
              Voltar
            </Button>
          )}
          <Button onClick={() => handleContinue()} disabled={isLoading}>
            {buttonText}
          </Button>
        </div>
        <Dialog
          onClose={() => {
            setOpen(false)
            if (termCheck) history.push('/')
          }}
          open={isOpen}
        >
          <DialogTitle>Sucesso!</DialogTitle>
          <DialogContent>{modalMessage}</DialogContent>
        </Dialog>
      </>
    </S.Wrapper>
  )
}

export default BudgetForm
