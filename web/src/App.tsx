import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import Footer from "./components/Footer"
import GlobalStyle from "./components/GlobalStyle"

import router from "./router"

function App() {
    return (
        <Suspense fallback={<h2>Carregando pagina</h2>}>
			<GlobalStyle />
            <RouterProvider router={router} />
            <Footer />
        </Suspense>
    )
}

export default App
