import { NextResponse } from "next/server";
const correctQuestions = [{'key' : 0, 'answer': 'talc'},{'key' : 1,'answer': 'onion'},{'key' : 2, 'answer': 'wonka'},{'key' :3, 'answer': 'edges'},{'key' : 4, 'answer': 'leo'},{'key' : 5,'answer': 'towel'},{'key' : 6, 'answer': 'anode'},{'key' : 7,'answer': 'lingo'},{'key' : 8,'answer': 'coke'},{'key' : 9, 'answer': 'nas'}];

export async function GET(request) {
  return NextResponse.json({ message: "Get Error" }, { status: 200 });
}
/*
{
'key': 0,
'answer': 'towel'
}
*/
export async function POST(request) {
    const jsonRequest = await request.json()
    const response = {'result': false}
    if(correctQuestions[jsonRequest.key].answer == jsonRequest.answer){ response.result = true};
    return NextResponse.json(response, { status: 200 });
}