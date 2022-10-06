import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'


const Navbar = () => {
  const { isAuth } = useSelector((state) => state.authh)
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }
  
  return (
    <nav className='navbar navbar-light bg-dark'>
      <div className='container'>
        <div>
          <NavLink to='/' style={{textDecoration: 'none'}}>
            <span className='navbar-brand mb-0 h1' style={{color: 'grey'}}>Home(LOGO)</span>
          </NavLink>
        </div>

        {isAuth ? (
          <div style={{color: 'grey'}}>
            <NavLink to='/search' className='mx-3' style={{color: 'grey', textDecoration: 'none'}}>
              <span>Buscar profesional</span>
            </NavLink>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Nombre del usuario
              </button>
              <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li><button className="dropdown-item" >Perfil</button></li>
                <li><button className="dropdown-item" onClick={() => logout()}>Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <NavLink to='/login' style={{textDecoration: 'none', color: 'grey'}}>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' className='mx-3' style={{border: '1px solid black', borderRadius: '7px', padding: '5px', textDecoration: 'none', backgroundColor: 'white', color: 'black'}}>
              <span >Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar