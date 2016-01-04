#!/bin/bash
# This script restores the /tmp directory's normal status

ramdisk=/mnt/ramdisk # ramdisk address
ramtmp=tmp # Ramdisk temp directory name
tempdir=/tmp # Temp directory address

# Remove old tmp file (symlink)
echo -e '\E[0;33m'"\033[1mRemoving symbolic link\033[0m"
rm $tempdir
 
echo -e '\E[0;33m'"\033[1mCreating ordinary /tmp directory\033[0m"
mkdir $tempdir

chown root:root $tempdir
chmod 777 $tempdir
chmod +t $tempdir
