import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './contexts/UserContext'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { BlogContextProvider } from './contexts/BlogContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <BlogContextProvider>
          <App />
        </BlogContextProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
