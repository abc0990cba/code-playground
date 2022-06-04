SYS_EXIT 	equ 1
SYS_WRITE	equ 4
STDOUT		equ 1

section	.text
	global _start            	 ;must be declared for using gcc
	
_start:                      	 ;tell linker entry point
	mov	edx, len             	 ;message length
	mov	ecx, msg             	 ;message to write
	mov	ebx, STDOUT	         	 ;file descriptor (stdout)
	mov	eax, SYS_WRITE	     	 ;system call number (sys_write)
	int	0x80                 	 ;call kernel

	mov	eax, SYS_EXIT	     	 ;system call number (sys_exit)
	int	0x80                 	 ;call kernel

section	.data
msg	db   'Hello, world!',0xa     ;our dear string
len	equ   $ - msg	             ;length of our dear string