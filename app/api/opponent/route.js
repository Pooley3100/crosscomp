import { NextResponse } from "next/server";

/*
Json response format
[
{ wordKey: Int, ClientID: Int, Answer: string}
]
*/

var results = [{wordKey: 2, clientID: 2, Answer: 'wonka'}]

export async function GET(request) {
    //will need to do have client key at some point
  return NextResponse.json(results, { status: 200 });
}

function updateResult(answer){
  results.push(answer)
}

export {updateResult}