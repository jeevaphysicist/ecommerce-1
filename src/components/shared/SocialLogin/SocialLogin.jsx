import { signIn , signOut , useSession , getProviders } from "next-auth/react";

export const SocialLogin = ({providers}) => {
  return (
    <ul className='login-form__social'>
      {/* <li>
        <a href='#'>
          <i className='icon-facebook'></i>
        </a>
      </li>
      <li>
        <a href='#'>
          <i className='icon-twitter'></i>
        </a>
      </li>
      <li>
        <a href='#'>
          <i className='icon-insta'></i>
        </a>
      </li> */}
      {
            providers && Object.values(providers).map(provider=>(
              <li>
              <a >
                <i className='icon-google' onClick={()=>{signIn(provider.id)}}  ></i>
              </a>
            </li>
            ))
          }
     
    </ul>
  );
};
