import { Client } from "./client.model";
import { Plan } from "./plan.model";

export interface ClientPlan {
    id: string;
    clientId: string;
    planId: string;
}

export interface ClientWithPlans {
    client: Client;
    assignedPlans: { associationId: string, plan: Plan }[];
}