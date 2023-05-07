import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './models/invoice.model';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { CreateInvoiceInput, UpdateInvoiceInput } from './input/create-invoice.input';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(Invoice)
export class InvoiceResolver {
    constructor(
        private readonly invoiceService: InvoiceService,
    ) { }

    @UseGuards(AuthGuard)
    @Mutation(() => Invoice)
    createInvoice(@CurrentUser() currentUser: string, @Args('input') input: CreateInvoiceInput) {
        return this.invoiceService.createInvoice(currentUser, input);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Invoice])
    findAllInvoice() {
        return this.invoiceService.findAllInvoice();
    }

    @Query(() => [Invoice])
    findUserInvoices(@Args('userId') userId: string) {
        return this.invoiceService.findUserInvoices(userId);
    }

    @Mutation(() => String)
    updateInvoice(@Args('input') input: UpdateInvoiceInput) {
        return this.invoiceService.updateInvoice(input);
    }

    @Mutation(() => Number)
    removeInvoice(@Args('id') id: string) {
        return this.invoiceService.removeInvoice(id);
    }
}