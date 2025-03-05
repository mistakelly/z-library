# Proposal for a Change of Response Format

## Boss Man, don't you think this should be the format of the response?

### Based on the description of the need you mentioned to me and considering what you jut showed me on how each guest is sorted:

1. The **main response** should be the `Gift` entity since that is what we are working on.
2. The **Gift entry** should be an **array**, where each object represents a **Gift**.
3. The `Gift` entity should include:

   - The **ID** of the Gift.
   - The **name** of the Gift.
   - The **total amount contributed** for that Gift.

4. The **Gift objects** is **sorted** by the highest contribution.

### Nested Guest Information

- Each **Gift** should contain an **array of Guests**, where each object represents a **Guest**.
- The **Guest objects** is also **sorted** by the highest contributor for that particular Gift.

### Why This Change?

This change ensures that once the client grabs a single object, they immediately know they are working with a specific Gift record and also avoid the multiple sprout of the **total_amount** record which in the current response i cannot tell which entry has each **total_amount**.

---

**Let me know if this makes sense to you, or if you need more clarification.**  
Or should we go with your approach? I also need clarification on your thought process, Sir.

```ts

const responsse = {
  data: [
    {
      id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
      name: "vacation",
      total_amount: "$2200", //Total about for this Gift titled "Vacation"

      guest: [
        {
          name: "Emma",
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          avatar: "url",

          amount: [1000, 100, 100], // This is included because the guest might make multiple donations and the client may wanna see how the donations were made maybe display them or any thing he needs it for.

          total_amount: "$12000", // then the total amount the guest donated
        },

        {
          name: "Cynthia",
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          avatar: "url",

          amount: [500, 400, 100],

          total_amount: "$1000",
        },
      ],
    },
    // second gift record.
    {
      id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
      name: "Baby Shower",
      total_amount: "$1500", //Total about for this Gift titled "Vacation"

      guest: [
        {
          name: "Emma",
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          avatar: "url",

          amount: [800], // This is included because the guest might make multiple donations and the client may wanna see how the donations were made maybe display them or any thing he needs it for.

          total_amount: "$800", // then the total amount the guest donated
        },

        {
          name: "Cynthia",
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          avatar: "url",

          amount: [300, 400],

          total_amount: "$700",
        },
      ],
    },
  ],



  {

  }
};


//I don't think this current response would work well.

{
  data: [{
    guest: {
      name: string
      id: string
      avatar: string
    },
    total_amount: string,
    gifts: [{
      gift: {
        name: string
        id: string
      },
      total_amount: string
    }]
  }]
}

g
```
*correction*

**With the question you just asked now, which makes sense, this should be the perfect response payload.**

Now the its an object of arrary where each single object is a guest record with nested gift array record 
where each object in the gift array record is a single gift.

You can see they are sorted very well. 
The gift is sorted and the guest is also sorted


```ts
const response = {
  data: [
    {
      name: "Emma",
      id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
      avatar: "url",

      total_amount: "$12000", // The amount the guest donated in every single gift in an event.

      gifts: [
        {
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          name: "Baby shower"
          amount: [300, 400],
          guest_total_amount: "$700", // Individual amount of each gift record.
          total_amount: "$4700",
        },
        {
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          name: "vacation",
          amount: [100, 400]
          guest_total_amount: "$500",
          total_amount: "$2200",
        },
      ],
    },

    {
      name: "Cynthia",
      id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
      avatar: "url",

      total_amount: "$700", // then the total amount the guest donated in every single gift in an event.

      gifts: [
        {
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          name: "Baby shower"
          amount: [300],
          total_guest_amount: "$300"
          total_amount: "$4700",
        },
        {
          id: "7e73c1f1-9938-4db4-9aef-6fd3d63ef2f8",
          name: "vacation",
          amount: [100, 100]
          guest_total_amount: "$200",
          total_amount: "$2200",
        },
      ],
    },
  ],
};
```
