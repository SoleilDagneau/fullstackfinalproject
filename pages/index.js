import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function Component() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
      <main className={styles.main}>
      <div className={styles.signin}>
        Successfully Signed in as: <br/> {session.user.email}
      </div>
         <br />
        <img className={styles.pfp} src={session.user.image} />
        <br />
        <div className={styles.signin}> {session.user.name} <br />
          </div>
        <button className={styles.signinbutton} onClick={() => signOut()}>Sign out</button>
        <button className={styles.signinbutton1}  onClick={handleClick}>Continue to Site</button>
      </main>
      

      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if(!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
