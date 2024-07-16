import { NextResponse } from "next/server";
const correctQuestions = [{'key' : 0, 'answer': 'talc'},{'key' : 1,'answer': 'onion'},{'key' : 2, 'answer': 'wonka'},{'key' :3, 'answer': 'edges'},{'key' : 4, 'answer': 'leo'},{'key' : 5,'answer': 'towel'},{'key' : 6, 'answer': 'anode'},{'key' : 7,'answer': 'lingo'},{'key' : 8,'answer': 'coke'},{'key' : 9, 'answer': 'nas'}];
/*
[{
'key': 0,
'word': 'towel'
},...]
*/
//Used to then emit flag for completion
export async function POST(request) {
    const jsonRequest = await request.json()
    const response = {'result': true}
    //No sorting by key or sanitization here .... baad
    for(var i = 0; i<correctQuestions.length; i++){
        if(correctQuestions[i].answer != jsonRequest[i].word){ response.result = false};
    }
    return NextResponse.json(response, { status: 200 });
}