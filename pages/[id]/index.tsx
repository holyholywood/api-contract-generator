import ResultSection from "@/components/organisms/ResultSection";
import Layout from "@/components/templates/Layout";
import APIContractService from "@/lib/services/api-contract-service";
import { apiContract } from "@/model/API/type";
import { Button } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { RiEditLine, RiShare2Line, RiShareLine } from "react-icons/ri";

interface pageProps {
  id: string;
  data: apiContract;
}

export const getServerSideProps: GetServerSideProps<pageProps> = async ({ req, res, query, params }) => {
  const id = params ? params.id : null;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const data = await APIContractService.findByID(String(id));
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      id: String(id),
      data: JSON.parse(JSON.stringify(data)) as unknown as apiContract,
    },
  };
};

const DetailAPIContract = ({ id, data }: pageProps) => {
  const router = useRouter();
  return (
    <Layout title={`${data.baseURL + data.endpoint} ${data.title ?? ""} - API Contract Generator`}>
      <ResultSection
        {...data}
        params={data.params ?? []}
        query={data.query ?? []}
        reqBody={data.reqBody ?? { reqBody: "", description: "" }}
        withBorder={false}
      />
      <div className="max-w-5xl mx-auto pb-10 flex items-center justify-end gap-4">
        <Button onClick={() => router.push(router.asPath + "/edit")} color="secondary" size="lg" className="" startContent={<RiEditLine />}>
          Edit
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.toString());
          }}
          color="primary"
          size="lg"
          className=""
          startContent={<RiShareLine />}
        >
          Share
        </Button>
      </div>
    </Layout>
  );
};

export default DetailAPIContract;
