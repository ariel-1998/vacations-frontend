import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './App/store'
import Layout from './Components/Layout/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { interceptorService } from './services/interceptorService'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

const staleTime = 20 * 60 * 1000

interceptorService.createInterceptors();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleTime,
      keepPreviousData: true
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout />
          <ToastContainer position='top-center'
            hideProgressBar={true}
            autoClose={2000} theme={'colored'} />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
