import React from 'react'
import ProductList from './containers/ProductList/ProductList'
import ProductDetails from './containers/ProductDetails/ProductDetails'
import WhoIs from './containers/WhoIs/WhoIs'
import BaseLayout from './containers/BaseLayout/BaseLayout'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { createTheme, ThemeProvider } from '@mui/material'
import StateProviders from './utils/StateProviders'
import BookingRules from './containers/BookingRules/BookingRules'
import Contact from './containers/Contact/Contact'
import BudgetForm from './containers/BudgetForm/BudgetForm'

const history = createBrowserHistory()
const theme = createTheme({
  palette: {
    primary: {
      main: '#49694A',
    },
  },
})

function App() {
  return (
    <StateProviders>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <BaseLayout>
            <Switch>
              <Route path='/' exact component={ProductList} />
              <Route path='/flash-detalhes/:code' component={ProductDetails} />
              <Route path='/sobre-mari' component={WhoIs} />
              <Route path='/condicoes-agendamento' component={BookingRules} />
              <Route path='/contato' component={Contact} />
              <Route path='/orcamento' component={BudgetForm} />
            </Switch>
          </BaseLayout>
        </Router>
      </ThemeProvider>
    </StateProviders>
  )
}

export default App
