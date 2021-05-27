/* eslint-disable no-mixed-spaces-and-tabs */
type AccessingTab = 'admin' | 'user';
type ServerSideConfig = {
	props: { bookings: [] },
	redirect: {
		destination: string;
		permanent: boolean;
	};
}
type handleRedirect = (data: User.Data | undefined, accessingTab: AccessingTab) => ServerSideConfig | undefined;

class AccessHadler {
	public handleRedirect: handleRedirect = (user, accessingTab) => {
	  if (!user) {
	    return {
	      props: { bookings: [] },
	      redirect: {
	        destination: '/signin',
	        permanent: false,
	      },
	    };
	  }
	  else if (user.role !== accessingTab) {
	    return {
	      props: { bookings: [] },
	      redirect: {
	        destination: `/${user.role}/dashboard`,
	        permanent: false,
	      },
	    };
	  }
	  else return;
	}
}
export default new AccessHadler();