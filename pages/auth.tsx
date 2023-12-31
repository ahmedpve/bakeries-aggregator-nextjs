import AuthForm from "@/components/auth-form/auth-form";
import usePageProtect from "@/hooks/use-page-protect";
import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FaUserPlus, FaUserShield } from "react-icons/fa";

interface AuthPageQuery extends ParsedUrlQuery {
  form?: "signin" | "signup";
}

export default function AuthPage() {
  const { isCheckingAuth, LoadingSpinner } = usePageProtect({ allowed: "unAuthenticated" });
  const { query }: NextRouter & { query: AuthPageQuery } = useRouter();
  const { form: formType = "signin" } = query;

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{`${formType === "signup" ? "Sign Up" : "Sign In"} | Bakeries Aggregator`}</title>
      </Head>

      <Flex
        flexDirection="column"
        alignItems="center"
        maxW="lg"
        mx="auto"
        my="8"
        boxShadow="sm"
        border="1px"
        borderColor="blackAlpha.400"
        borderRadius="lg"
        px="8"
        py="16"
        bgColor="white"
      >
        <Icon as={formType === "signup" ? FaUserPlus : FaUserShield} mb="4" boxSize="8" color="secondary.600" />
        <Heading as="h2" size="h2" mb="10" textAlign="center">
          {formType === "signup" ? "Become A Member" : "Welcome Back"}
        </Heading>

        <AuthForm type={formType} />

        <Text mt="4" fontSize="sm" fontWeight="medium" textAlign="center">
          {formType === "signup" ? (
            <>
              Already have an account?{" "}
              <Link as={NextLink} href="?form=signin" color="primary.600" fontWeight="bold">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link as={NextLink} href="?form=signup" color="primary.600" fontWeight="bold">
                Sign Up
              </Link>
            </>
          )}
        </Text>
      </Flex>
    </>
  );
}
