import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { TextField, Dialog, DialogContent, DialogTitle } from '@mui/material'
import InputMask from 'react-input-mask'

import { fetchAddress } from '../../utils/fetchAdress'
import { catalogData } from '../../utils/catalogData'
import { prepareFlashPayload } from '../../utils/preparePayload'
import { addInfo } from '../../utils/sendToSpreadsheet'
import Button from '../../components/Button/Button.styled'
import * as S from './FlashForm.styled'

const FlashForm = () => {
  const [step, setStep] = useState(0)
  const [checks, setChecks] = useState({ age: null, vaccine: null })
  const [termCheck, setTermCheck] = useState(false)
  const [buttonText, setButtonText] = useState('Continuar')
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    cpf: '',
    preferredDay: { seg: '', ter: '', qui: '', sex: '', sab: '' },
    preferredMonth: {  nov: '', dez: '', jan: '' },
    preferredHour: { ten: '', fourteen: '', sixteen: '', thirteen: '' },
    address: {
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
    },
    bodyPlacement: '',
  })

  const history = useHistory()
  const { code } = useParams()

  const nome = catalogData.find(flash => flash.code === code).name

  const stepsRender = [
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
          Você já tomou pelo menos uma dose da vacina contra a COVID-19?
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
          <input
            type='checkbox'
            id='segunda'
            name='preferredDay'
            value='segunda'
            onChange={event =>
              setFormData({
                ...formData,
                preferredDay: {
                  ...formData.preferredDay,
                  seg: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='segunda'>Segunda</label>
          <input
            type='checkbox'
            id='terca'
            name='preferredDay'
            value='terca'
            onChange={event =>
              setFormData({
                ...formData,
                preferredDay: {
                  ...formData.preferredDay,
                  ter: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='terca'>Terça</label>
          <input
            type='checkbox'
            id='quinta'
            name='preferredDay'
            value='quinta'
            onChange={event =>
              setFormData({
                ...formData,
                preferredDay: {
                  ...formData.preferredDay,
                  qui: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='quinta'>Quinta</label>
          <input
            type='checkbox'
            id='sexta'
            name='preferredDay'
            value='sexta'
            onChange={event =>
              setFormData({
                ...formData,
                preferredDay: {
                  ...formData.preferredDay,
                  sex: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='sexta'>Sexta</label>
          <input
            type='checkbox'
            id='sabado'
            name='preferredDay'
            value='sabado'
            onChange={event =>
              setFormData({
                ...formData,
                preferredDay: {
                  ...formData.preferredDay,
                  sab: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='sabado'>Sábado</label>
        </div>
      </S.Row>
      <S.Row>
        <label>Quais horários você pode? Marque quantas opções quiser</label>
        <div>
          <input
            type='checkbox'
            id='ten'
            name='preferredHour'
            value='ten'
            onChange={event =>
              setFormData({
                ...formData,
                preferredHour: {
                  ...formData.preferredHour,
                  ten: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='ten'>Às 10h</label>
          <input
            type='checkbox'
            id='fourteen'
            name='preferredHour'
            value='fourteen'
            onChange={event =>
              setFormData({
                ...formData,
                preferredHour: {
                  ...formData.preferredHour,
                  fourteen: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='fourteen'>Às 14h</label>
          {formData.preferredDay.seg === 'sim' ||
          formData.preferredDay.ter === 'sim' ? (
            <>
              <input
                type='checkbox'
                id='sixteen'
                name='preferredHour'
                value='sixteen'
                onChange={event =>
                  setFormData({
                    ...formData,
                    preferredHour: {
                      ...formData.preferredHour,
                      sixteen: event.target.checked ? 'sim' : 'não',
                    },
                  })
                }
              />
              <label htmlFor='sixteen'>Às 16h</label>
            </>
          ) : null}
          {formData.preferredDay.sab === 'sim' && (
            <>
              <input
                type='checkbox'
                id='thirteen'
                name='preferredHour'
                value='thirteen'
                onChange={event =>
                  setFormData({
                    ...formData,
                    preferredHour: {
                      ...formData.preferredHour,
                      thirteen: event.target.checked ? 'sim' : 'não',
                    },
                  })
                }
              />
              <label htmlFor='thirteen'>Às 13h (Exclusivo sábado)</label>
            </>
          )}
        </div>
      </S.Row>
      <S.Row>
        <label>Qual a sua preferência de mês?</label>
        <div>
          <input
            type='checkbox'
            id='nov'
            name='preferredMonth'
            value='nov'
            onChange={event =>
              setFormData({
                ...formData,
                preferredMonth: {
                  ...formData.preferredMonth,
                  nov: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='nov'>Novembro</label>
          <input
            type='checkbox'
            id='dez'
            name='preferredMonth'
            value='dez'
            onChange={event =>
              setFormData({
                ...formData,
                preferredMonth: {
                  ...formData.preferredMonth,
                  dez: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='dez'>Dezembro</label>
          <input
            type='checkbox'
            id='jan'
            name='preferredMonth'
            value='jan'
            onChange={event =>
              setFormData({
                ...formData,
                preferredMonth: {
                  ...formData.preferredMonth,
                  jan: event.target.checked ? 'sim' : 'não',
                },
              })
            }
          />
          <label htmlFor='jan'>Janeiro</label>
        </div>
      </S.Row>
      <S.Row>
        <label>
          Você quer tatuar no local sugerido? Caso não, digite abaixo o local
          escolhido
        </label>
        <TextField
          variant='standard'
          value={formData.bodyPlacement}
          onChange={event =>
            setFormData({ ...formData, bodyPlacement: event.target.value })
          }
          color='primary'
        />
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
        if (!checks.age || !checks.vaccine) return
        if (checks.age === 'no' || checks.vaccine === 'no') {
          history.push('/')
          return
        }
        return setStep(1)
      case 1:
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
        return setStep(2)
      case 2:
        const { preferredDay, preferredHour, preferredMonth } = formData
        if (
          !preferredDay.seg &&
          !preferredDay.ter &&
          !preferredDay.qui &&
          !preferredDay.sex &&
          !preferredDay.sab
        )
          return
        if (
          preferredDay.seg === 'não' &&
          !preferredDay.ter === 'não' &&
          !preferredDay.qui === 'não' &&
          !preferredDay.sex === 'não' &&
          !preferredDay.sab === 'não'
        )
          return
        if (!preferredMonth.jan && !preferredMonth.nov && !preferredMonth.dez)
          return
        if (
          preferredMonth.jan === 'não' &&
          preferredMonth.nov === 'não' &&
          preferredMonth.dez === 'não'
        )
          return
        if (
          !preferredHour.ten &&
          !preferredHour.fourteen &&
          !preferredHour.sixteen &&
          !preferredHour.thirteen
        )
          return
        if (
          preferredHour.ten === 'não' &&
          preferredHour.fourteen === 'não' &&
          preferredHour.sixteen === 'não' &&
          preferredHour.thirteen === 'não'
        )
          return
        setButtonText('Enviar')
        return setStep(3)
      case 3:
        if (!termCheck) return
        setLoading(true)
        const payload = prepareFlashPayload(formData, nome)
        const response = await addInfo(true, payload)
        setLoading(false)
        if (response) setOpen(true)
        return
      default:
    }
  }

  return (
    <S.Wrapper>
      <h3>
        Responda todas as questões a seguir e clique no botão para continuar
      </h3>
      {stepsRender[step]}
      <div>
        {step > 1 && (
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
          history.push('/')
        }}
        open={isOpen}
      >
        <DialogTitle>Sucesso!</DialogTitle>
        <DialogContent>
          O seu formulário foi enviado e em breve entraremos em contato com
          você!
        </DialogContent>
      </Dialog>
    </S.Wrapper>
  )
}

export default FlashForm
