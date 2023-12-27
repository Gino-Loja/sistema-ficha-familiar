import conn from "@/database/connection";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const userFound = await conn.query(
          `SELECT csctbpersonalid, nombresp, apellido_pat, apellido_mat, pass FROM csctbpersonal WHERE cedula = $1 AND pass = $2;`,
          [credentials.user, credentials.password]
        );

        if (!userFound.rows.length) {
          throw new Error("No user found");
        }

        console.log(userFound.rows[0]);

        if (!(userFound.rows[0].pass == credentials.password)) {
          throw new Error("Wrong password");
        }
        return {
          id: userFound.rows[0].csctbpersonalid,
          name: userFound.rows[0].nombresp,
          email: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.email = session.email
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
