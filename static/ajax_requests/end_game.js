export default function ending_questions(data){
    $.ajax({
        url: "/add_endgame_report",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}