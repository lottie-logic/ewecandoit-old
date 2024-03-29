import "./globals.css";
import NavBar from "./layout/NavBar";
// import SideBar from "./layout/SideBar";

// old way in Next.js...
// export async function getStaticPaths(topic: string) {
async function getTopics() {
  const query = `query {
    topicCollection {
      items {
        slug
        image
        title
      }
    }
  }`;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());

  const topics = response.data.topicCollection.items;
  return topics;
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getTopics();
  return (
    <html lang="en">
      <body>
        <NavBar data={data} />
        {/* <SideBar /> */}
        {children}
      </body>
    </html>
  );
}
