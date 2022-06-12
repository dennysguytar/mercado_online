import styled from 'styled-components'
import { CardContent, Typography, Select } from '../../../components'
import { ValidatorForm } from 'react-material-ui-form-validator'

export const LabelStyled = styled(Typography)`
  font-weight: 500;
  font-size: 1.5rem;
`

export const ValueStyled = styled(Typography)`
  font-weight: 400;
  font-size: 2.5rem;
`

export const CardContentStyled = styled(CardContent)`
  border-left: 8px solid ${({ color }) => color || '#5d78ff'};
`

export const CardPanelContentStyled = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  padding: 25px;

`
export const SelectStyled = styled(Select)`
  padding-left: 6px;
  border-radius: 3px;
  border: 1px gray inset;

`

export const ValidatorFormStyled = styled(ValidatorForm)`
  & .MuiFormControl-root{
    margin-bottom: 0px;
    padding-right: 30px;
    min-width: 150px;
  }

`

export const ItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 150px;
`