# Getting started:
If you don't have lodash installed, run `npm install lodash`

From the directory, run `node locations.js` and open browser to port 8080.

And click!

# Instructions:

User story: 
As a product owner, I would like to show the user a selectable list of neighborhoods where activities are available with KidPass.

Description:
Within the attached json file (this is an actual response from our API), there is an array of objects. Each object has two properties, a borough, and mappings. Mappings also has two properties, macro and neighborhoods. Macro is kind of like a larger neighborhood. For example, Manhattan doesn’t have an actual neighborhood called “Above 125th”. Instead, “Above 125th” is a macro neighborhood that consists of the actual Manhattan neighborhoods: Harlem, Inwood, Washington Heights. You’ll also notice that some Macro neighborhoods are the same as the borough.

Acceptance Criteria:
In area A of the html page, display a list of boroughs along with their neighborhoods in a way that shows the hierarchy.
Fit macro neighborhoods into that hierarchy, but only list a macro neighborhood within the borough’s listing if it’s not the same as the borough. So some listings will be three levels deep: Borough -> Macro -> Neighborhood
The boroughs and macro neighborhoods should be ordered ascending by weight.
On the same page, in a separate area (we’ll call it area B), show a listing of just the boroughs. 
Only the neighborhoods in area A are clickable. When I click on a neighborhood in area A, the borough which that neighborhood belongs to should be highlighted (will leave that up to you as to how the highlighting should work).
Use javascript. Feel free to use a utility library like lodash.

