import { toast } from "react-toastify";

export function ToastWithComponentContent(type: 'danger' | 'warning'| 'success', title: string, content: any ) {
    toast(
        <div>
          <div className="toast-custom__body">
            <div className="toast-custom__title">{title}</div>
            <div className="toast-custom__content">
              {content}
            </div>
            {/* <div>            <a className="btn " style={{borderColor:"#1db954", backgroundColor:"#1db954"}}  href='https://accounts.spotify.com/authorize?client_id=aa81c8b08f9847ccb97d12ed03dccd34&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&scope=user-read-playback-state%20user-read-currently-playing%20user-read-private%20user-read-email%20user-follow-read%20streaming%20app-remote-control%20user-read-playback-position%20user-top-read%20user-read-recently-played%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public'  >SIGN IN</a></div> */}
          </div>
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          className: `toast-custom toast--${type}`,
          bodyClassName: 'toast-custom__body',
          autoClose: 3000,
        }
      );
}