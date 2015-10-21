### exercise: blank, 
#### tags: ["ko", "ko.observableArray", "ko.utils.arrayForEach", "ko.mapping.fromJS", "ko.computed"]
<a href="/fiddles/index.html">[back to fiddles]</a>

The html code:

    <tbody data-bind='foreach:List'>
        <tr>
            <!-- ko foreach:Entries-->
            <td>
                <input size="3" type="text" data-bind="value:Hours, valueUpdate:'afterkeydown'"/>
            </td>
            <!-- /ko -->
            <td>
                <span data-bind="text:Total"></span> 
            </td>
        </tr>
    </tbody>