export default function decision_data(data){
    $.ajax({
        url: "/add_decision",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}