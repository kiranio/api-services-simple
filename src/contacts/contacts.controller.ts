import { Controller, Get } from '@nestjs/common';
import { ContactDto } from './contact.dto';
import { ContactsService } from './contacts.service';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('contacts')
export class ContactsController {

    constructor(private contactsService: ContactsService){}

    @Get()
    fetchContacts(): Promise<ContactDto[]> {
      return this.contactsService.findAll();
    }  

    @Post('create')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() contactData: ContactDto): Promise<any> {
      return this.contactsService.create(contactData);
    } 

    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: ContactDto): Promise<any> {
        contactData.id = Number(id);
        console.log('Update #' + contactData.id)
        return this.contactsService.update(contactData);
    } 

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.contactsService.delete(id);
    } 
}
