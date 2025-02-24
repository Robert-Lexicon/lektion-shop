import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Pokemon } from "@/lib/interfaces";
import { fetchFromAPI } from "@/data-access/pokeapi";

const API_URL = "https://pokeapi.co/api/v2/";
const ENDPOINT = "pokemon";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data, the data is cached in nextjs so it won't be fethed again in page component
  const url = `${API_URL}/${ENDPOINT}/${id}`;
  const data = await fetchFromAPI<Pokemon>(url);

  return {
    title: "message" in data ? data.message : `Details for ${data.name}`,
  };
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const url = `${API_URL}/${ENDPOINT}/${id}`;
  const data = await fetchFromAPI<Pokemon>(url);

  //if there is a message in data it means error, so display that and nothing else
  //TODO: Handle this better
  if ("message" in data) {
    console.log("Error fetching data:", data.message);
    return <div>Error: {data.message}</div>;
  }

  //TODO: Refactor out this to a card component instead
  return (
    <Card className="m-4 max-w-100 mx-auto">
      <CardHeader>
        <CardTitle className="capitalize flex gap-1 items-center justify-between text-xl">
          <div>
            {data.name}{" "}
            <span className="text-muted-foreground">#{data.id}</span>
          </div>
          {data.sprites.front_default && (
            <Avatar>
              <AvatarImage
                className="bg-accent"
                src={data.sprites.front_default}
                alt="Avatar"
              />
            </Avatar>
          )}
        </CardTitle>
        <Separator className="mt-2" />
        <CardDescription className="space-y-2">
          <div className="flex items-center justify-between flex-wrap">
            <p>
              Species: <span className="capitalize">{data.species.name}</span>
            </p>
            <Separator orientation="vertical" />
            <p>Height: {data.height} dm</p>
            <Separator orientation="vertical" />
            <p>Weight: {data.weight} hg</p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-wrap gap-1 mt-4">
            Type:
            {data.types.map((type, i) => (
              <Badge variant={"secondary"} key={i}>
                {type.type.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            Abilities:{" "}
            {data.abilities.map((a, i) => (
              <Badge variant={"secondary"} key={i}>
                {a.ability.name}
              </Badge>
            ))}
          </div>
        </CardDescription>

        {data.sprites.front_default && (
          <Image
            className="w-full h-full border my-4"
            src={data.sprites.front_default}
            width={96}
            height={96}
            alt="front default"
          />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Pokemon Stats</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-50">Stat</TableHead>
              <TableHead className="text-center">Base Stat</TableHead>
              <TableHead className="text-right">Effort</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.stats.map((stat, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {stat.stat.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {stat.base_stat}
                  </TableCell>
                  <TableCell className="text-right">{stat.effort}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
